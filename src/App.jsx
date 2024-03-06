
import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [len, setLen] = useState(8)
  const [numallowed, setNumallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [pass, setPass] = useState("")


  const passGenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*():"

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)

    } setPass(password)


  }, [len, numallowed, charallowed, setPass])

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(pass)


  })

  const passRef = useRef(null)



  useEffect(() => {
    passGenerator()
  }, [len, numallowed, charallowed, setPass, passGenerator])

  return (
    <>
      <div className="mx-auto my-9  px-4  w-full max-w-md shadow-2xl bg-orange-300 rounded-md text-green-800 py-3 ">
        <h1 className="text-4xl text-green-800 text-center mb-5 mt-5 ">Password Generator</h1>
        <div className=" flex shadow-md rounded-lg overflow-hidden mb-4
        ">

          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 outline-none px-3  text-white py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2  text-green-800 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={len}
              className="cursor-pointer"
              id="range"
              onChange={(e) => { setLen(e.target.value) }} />
            <label
              className=" " htmlFor="range">Length : {len}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numallowed}
              id="numinput"
              onChange={() => {
                setNumallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numinput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charallowed}
              id="charinput"
              onChange={() => {
                setCharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charinput">Characters</label>
          </div>
        </div>


      </div>



    </>
  )
}

export default App
