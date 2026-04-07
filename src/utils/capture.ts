const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export async function captureCard(elementId: string): Promise<Blob | null> {
  const el = document.getElementById(elementId);
  if (!el) return null;

  try {
    const mod = await import('html2canvas');
    const html2canvas = mod.default;

    const canvas = await html2canvas(el, {
      backgroundColor: '#12151e',
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      removeContainer: true,
    });

    return await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
    });
  } catch {
    return null;
  }
}

export async function downloadImage(blob: Blob, filename: string): Promise<boolean> {
  if (isIOS()) {
    return downloadImageIOS(blob, filename);
  }

  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    return true;
  } catch {
    return false;
  }
}

async function downloadImageIOS(blob: Blob, filename: string): Promise<boolean> {
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename });
      return true;
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return true;
    }
  }

  try {
    const reader = new FileReader();
    return await new Promise<boolean>((resolve) => {
      reader.onload = () => {
        const w = window.open('');
        if (w) {
          w.document.title = filename;
          w.document.body.style.margin = '0';
          w.document.body.style.background = '#000';
          w.document.body.innerHTML = `
            <p style="color:#fff;text-align:center;padding:16px 12px;font-family:system-ui;font-size:14px;">
              이미지를 길게 눌러 저장해주세요
            </p>
            <img src="${reader.result}" style="width:100%;display:block;" />
          `;
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(blob);
    });
  } catch {
    return false;
  }
}

export async function shareImage(
  blob: Blob,
  filename: string,
  title: string,
  text: string,
): Promise<'shared' | 'downloaded' | 'error'> {
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.share) {
    const canShareFile = navigator.canShare?.({ files: [file] });

    if (canShareFile) {
      try {
        await navigator.share({ title, text, files: [file] });
        return 'shared';
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return 'shared';
      }
    } else {
      try {
        await navigator.share({ title, text });
        return 'shared';
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return 'shared';
      }
    }
  }

  const ok = await downloadImage(blob, filename);
  return ok ? 'downloaded' : 'error';
}
