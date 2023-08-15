export const setCover = (src: string) => {
  const step1 = src.replace('https://drive.google.com/file/d/', '');
  const step2 = step1.replace('/view?usp=drive_link', '');
  return `https://drive.google.com/uc?export=view&id=${step2}`;
};
