

function BackgroundGlow() {
  return (
    <div className="object-contain min-h-screen w-full h-full absolute top-0 overflow-x-hidden left-0 z-10">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-10 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

    </div>
  )
}

export default BackgroundGlow
