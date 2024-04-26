import addImage from '@/assets/icon/add-image.svg';

export default function AddImageButton() {
  return (
    <div className="w-12 h-12 absolute bottom-5 right-5 flex justify-center items-center hover:cursor-pointer rounded-full bg-zinc-800">
      <label htmlFor="inputFile" className="hover:cursor-pointer">
        <div>
          <img src={addImage} alt="add-image" />
        </div>
      </label>
    </div>
  );
}
