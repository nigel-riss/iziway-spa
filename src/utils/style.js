export const getGradientFromArray = (colors) => {
  console.log(colors);
  const gradient = colors.reduce((acc, curr, i, arr) => {
    const percentDelta = ~~(100 / arr.length);
    return `${acc}, ${curr} ${i * percentDelta}%, ${curr} ${(i + 1) * percentDelta}%`;
  }, ``);
  return `linear-gradient(135deg ${gradient})`;
};


export const ColorNameToHexMap = {
  'Бежевый':        [`#f5f5dc`, `#f5f5dc`],
  'Бело-черные':    [`#ffffff`, `#000000`],
  'Белый':          [`#ffffff`, `#ffffff`],
  'Бирюзовый':      [`#30d5c8`, `#30d5c8`],
  'Бордовый':       [`#9b2d30`, `#9b2d30`],
  'Голубой':        [`#42aaff`, `#42aaff`],
  'Желто-зеленый':  [`#ffff00`, `#00ff00`],
  'Желтый':         [`#ffff00`, `#ffff00`],
  'Зеленый':        [`#00ff00`, `#00ff00`],
  'Золотой':        [`#ffd700`, '#ffd700'],
  'Камуфляж':       [`#425e17`, `#425e17`],
  'Коралловый':     [`#ff7f50`, `#ff7f50`],
  'Коричневый':     [`#964b00`, `#964b00`],
  'Красный':        [`#ff0000`, `#ff0000`],
  'Мятный':         [`#3eb489`, `#3eb489`],
  'Оранжевый':      [`#ffa500`, `#ffa500`],
  'Песочный':       [`#fcdd76`, `#fcdd76`],
  'Разноцветный':   [`#ff0000`, `#ffa500`, `#ffff00`, `#008000`, `#42aaff`, `#0000ff`, `#8b00ff`],
  'Розовый':        [`#ffc0cb`, `#ffc0cb`],
  'Серебристый':    [`#d7d7d8`, `#c7c9cb`],
  'Серый':          [`#aeb2b8`, `#aeb2b8`],
  'Синий':          [`#0000ff`, `#0000ff`],
  'Фиолетовый':     [`#8b00ff`, `#8b00ff`],
  'Черно-розовый':  [`#000000`, `#ffc0cb`],
  'Черный':         [`#000000`, `#000000`],
};
