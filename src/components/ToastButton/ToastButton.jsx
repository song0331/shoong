import pb from '@/api/pocketbase';

export default function ToastButton({
  phocaID,
  addID,
  id,
  handleToast,
  ment,
  result,
  name,
  buttonStyle,
  textStyle,
}) {
  return (
    <button
      className={`inline-flex h-30pxr w-100pxr items-center justify-center gap-2.5 rounded px-5 py-5pxr ${buttonStyle}`}
      onClick={() => {
        const data = {
          cardInfo: [...phocaID, ...addID],
        };
        pb.collection('collectBook').update(id, data);
        handleToast(ment, result);
      }}
    >
      <div className={`text-sm font-bold leading-tight ${textStyle}`}>
        {name}
      </div>
    </button>
  );
}
