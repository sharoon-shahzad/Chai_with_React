import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [lenght, setLenght] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");


  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";


    for (let i = 1; i <= lenght; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length));
      console.log(password);
    }

    setPassword(password);
  }, [lenght, numAllowed, charAllowed, setPassword]);


  const copyPass = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(Password);
  },[Password]);




  useEffect(()=>{
    passwordGenerator();
  } ,[ lenght,numAllowed, charAllowed , setPassword]  );



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-white text-gray-700">
        <h1 className="text-3xl font-bold text-center mb-5 text-orange-500">
          Password Generator
        </h1>
        <div className="flex items-center shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="w-full px-4 py-2 outline-none text-gray-700"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
           onClick={copyPass} 
           onMouseEnter={(e)=>{ e.target.style.backgroundColor="orange"}} 
           onMouseLeave={(e)=>{ e.target.style.backgroundColor="orange"}}
           className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <label className="text-sm font-medium">Length:</label>
            <input
              type="range"
              min={6}
              max={100}
              value={lenght}
              onChange={(e) => {
                setLenght(e.target.value);
              }}
              className="cursor-pointer flex-grow"
            />
            <span className="text-sm font-medium">{lenght}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed(!numAllowed);
              }}
              className="cursor-pointer"
            />
            <label className="text-sm font-medium">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="cursor-pointer"
            />
            <label className="text-sm font-medium">
              Include Special Characters
            </label>
          </div>
          <button
            onClick={passwordGenerator} // this can also be done with useffect hook!
            className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
