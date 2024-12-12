// 隨機生成用戶名
const generateUsername = () =>
    `user${Math.floor(Math.random() * 10000)}`;
  
  // 隨機生成地址
  const generateLocation = () =>
    `${Math.floor(Math.random() * 1000)} 台南市中西區示例路`;
  
  // 隨機選擇圖片
  const generateImage = () => {
    const images = [
      "/images/大漢堡.jpg",
      "/images/咖啡.jpg",
      "/images/蛋糕.jpg",
      "/images/飲料.jpg",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };
  
  // 隨機生成內容
  const generateContent = () => {
    const contents = [
      "超美味的漢堡，大家快來試試！",
      "台南最新開的咖啡店，推薦給大家！",
      "今天發現了一家超棒的甜點店！",
      "週末來杯清爽飲料，真的太棒了！",
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };
  
  // Mock 資料生成函數
  export const generateMockData = (count = 10) => {
    return Array.from({ length: count }, (_, id) => ({
      id: id + 1,
      user: {
        username: generateUsername(),
        avatar: "/images/頭像.jpg",
        location: generateLocation(),
      },
      content: generateContent(),
      image: generateImage(),
      isLiked: false,
      isCollected: false,
    }));
  };  