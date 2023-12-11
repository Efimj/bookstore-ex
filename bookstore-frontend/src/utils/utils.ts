export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(first_name: string, last_name: string) {
  let name = first_name + " " + last_name;
  try {
    return {
      style: {
        backgroundColor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  } catch (error) {
    return {
      style: {
        backgroundColor: stringToColor(name),
      },
      children: `${name.split(" ")[0]}${name.split(" ")[1]}`,
    };
  }
}

export function getFormattedDate(date:Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function getFileFromBase64(string64: string, fileName: string) {
  const base64String = string64.split(",")[1];
  const imageContent = window.atob(base64String);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  const type = "image/jpeg";
  const blob = new Blob([buffer], { type });
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type,
  });
}