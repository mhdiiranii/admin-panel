interface propTypes {
  width: number;
  height: number;
  loading?: boolean | null;
}

const Loading = ({ width, height, loading = true }: propTypes) => {
  if (!loading) {
    return null;
  }
  return (
    <div
      style={{ width: `${width * 4}px`, height: `${height * 4}px` }}
      className="rounded-full  border-r border-t border-b  flex items-center justify-center animate-spin border-blue-800 duration-700"
    >
      <div style={{ width: `${width * 2}px`, height: `${height * 2}px` }} className=" border-r border-t border-b rounded-full animate-spin duration-700  border-red-800 "></div>
    </div>
  );
};

export default Loading;
