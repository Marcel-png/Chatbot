import Image from 'next/image';
export default function Header() {
  const handleClose = () => {
    if (window.confirm("Voulez-vous vraiment quitter cette page ?")) {
      window.close();
    }
  };

  return (
    <header className="bg-white h-16 shadow-md flex items-center px-4 fixed top-0 w-full z-10">
      <Image
        src="/180665068.png"
        alt="Logo"
        className="h-10 w-10 mr-2"
        width={40}
        height={40}
      />
      <h1 className="text-blue-500 font-extrabold text-3xl mx-auto">BKMind</h1>
      <button
        onClick={handleClose}
        className="absolute right-4 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-red-400 transition-all"
      >
        Quitter
      </button>
    </header>
  );
}
