import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Confia en las variables de entorno: CLOUDINARY_URL, o las 3 divididas
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const maxDuration = 60; // Allowed for vercel to upload large files

export async function POST(req: Request) {
  try {
    const { file, folder = 'linksurprise' } = await req.json();

    if (!file) {
      return NextResponse.json({ success: false, error: 'File is required' }, { status: 400 });
    }

    // Try to determine resource type
    const resourceType = file.startsWith('data:audio') ? 'video' : 'auto'; 
    // Note: Cloudinary treats audio as 'video' resource_type

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: resourceType,
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
