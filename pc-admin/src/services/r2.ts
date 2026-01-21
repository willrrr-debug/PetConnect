import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

/**
 * Cloudflare R2 上传服务 (S3 兼容模式)
 */
export async function uploadToR2(file: File): Promise<string> {
    const accessKeyId = import.meta.env.VITE_R2_ACCESS_KEY_ID;
    const secretAccessKey = import.meta.env.VITE_R2_SECRET_ACCESS_KEY;
    const bucketName = import.meta.env.VITE_R2_BUCKET_NAME;
    const accountId = import.meta.env.VITE_R2_ACCOUNT_ID;
    const publicUrl = import.meta.env.VITE_R2_PUBLIC_URL;

    // 如果没有配置 R2 凭据，回退到本地预览 URL
    if (!accessKeyId || !secretAccessKey || !bucketName || !accountId) {
        console.warn('R2 凭据未配置，使用本地临时 URL');
        return URL.createObjectURL(file);
    }

    const s3 = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const key = `pets/${Date.now()}-${file.name}`;

    try {
        const arrayBuffer = await file.arrayBuffer();
        await s3.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: new Uint8Array(arrayBuffer),
                ContentType: file.type,
            })
        );

        // 返回图片的公共访问 URL
        // 如果没有配置 publicUrl，返回拼接后的 R2 内部 Key 标识
        return publicUrl ? `${publicUrl}/${key}` : key;
    } catch (error) {
        console.error('R2 upload error:', error);
        throw new Error('图片上传到 R2 失败');
    }
}
