export async function captureCard(elementId: string): Promise<Blob | null> {
  const el = document.getElementById(elementId);
  if (!el) return null;

  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(el, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    logging: false,
  });

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}

export async function downloadImage(blob: Blob, filename: string): Promise<void> {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = filename;
  a.href = url;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function shareOrDownload(
  blob: Blob,
  filename: string,
  title: string,
  text: string,
): Promise<'shared' | 'downloaded' | 'error'> {
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ title, text, files: [file] });
      return 'shared';
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return 'shared';
    }
  }

  try {
    await downloadImage(blob, filename);
    return 'downloaded';
  } catch {
    return 'error';
  }
}
