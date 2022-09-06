const getDifference = (createTime: string | undefined) => {
  if (createTime) {
    const end = new Date(createTime);
    const now = new Date();
    const difference = now.getTime() - end.getTime();
    const times = [
      { time: '분', milliSeconds: 1000 * 60 },
      { time: '시간', milliSeconds: 1000 * 60 * 60 },
      { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
      { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
      { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
    ].reverse();

    for (const value of times) {
      const betweenTime = Math.floor(difference / value.milliSeconds);
      if (betweenTime > 0) {
        return `${betweenTime}${value.time} 전`;
      }
    }
    return '방금 전';
  }
};

export default getDifference;
