// import { useCallback, useEffect, useState, useRef } from "react";
// import "./index.css";

// function App() {
//   const [length, setLength] = useState(8);
//   const [numberAllowed, setnumberAllowed] = useState(false); //i.e number chahiye k nhi
//   const [charAllowed, setcharAllowed] = useState(false);
//   const [password, setPassword] = useState(""); // null kun k password ki value pass krwayeinge baad ma
//   //useRef Hook
//   const passwordRef = useRef(null);

//   //password generator method // is method ne dono checkboxes k liye istemal hona ha so aik hi method ko aise likhna k dono kamo k liye use hojaye so hum ye kr skte usecallBack hook se
//   const passwordGenerator = useCallback(() => {
//     // usecallback uses for efficiency ta k har bar fn change hone pr page dobara render na ho bulky freeze hojaye // array ki values change hone pr hi bus rerender ho
//     //useCallback works like cachay memory
//     let pass = ""; //jo password generate krwa loonga wo is ma daloonga
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // abc in upper and lowercase

//     if (numberAllowed) str += "0123456789";
//     if (charAllowed) str += " !@#$%^&*()-_=+[]{}|;:~` ";

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length + 1);
//       pass += str.charAt(char); // ye is index pr jo char para ha wo dedega aur ye kam utni dafa hoga jitni dafa loop chalaygi
//     }
//     // ab ooper jo pass ki value mili usko read bhi tau kra ha na so setPassword wala fn jo ooper hook ma ha wo define krna ab
//     setPassword(pass);
//   }, [length, numberAllowed, charAllowed, setPassword]) //this fn setPassword is also a depencency kun k ye bhi bar bar use ho rha ha
//   // [length, numberAllowed, charAllowed, Password]); //password se infinite lopp ma chala jayega kun k jitni dafa for loop chalaygi utni dafa password ki value change hogi aur hr change hone pr useeffect call hoga aur wo passwordGenerator ko bhi call krge jisse infinite loop hojayegi

//   //fn to copypassword using reference
//   const copyPasswordToClipboard = useCallback(() => {
//     passwordRef.current?.select()    // automatically selected the copied text //current? --> means current password ki value null nhi ha tau khali krdo
//     passwordRef.current?.setSelectionRange(0, 999);
//     window.navigator.clipboard.writeText(password);
//   }, [password])

//   //use effect hook to call the function
//   useEffect(() => {
//     passwordGenerator();
//   }, [length, numberAllowed, charAllowed, passwordGenerator])  //In your case, you want the effect to run whenever length, numberAllowed, or charAllowed changes so that the password generator function gets called with the updated values.
//   //  The passwordGenerator function itself doesn't change over time, so it doesn't need to be included in the dependency array.

//   return (
//     <>
//       <div class="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700 ">
//         <h1 className="text-white text-center my-3">Password Generator</h1>

//         {/* In flexbox, child elements (the input and button in this case) are positioned horizontally within the parent container (div). */}
//         <div className="flex shadow rounded-lg overflow-hidden mb-4">
//           {/* textbox below */}
//           <input
//             type="text"
//             value={password}
//             className="outline-none w-full py-1 px-3"
//             placeholder="password"
//             readOnly
//             ref={passwordRef}
//           />
//           {/* adding button */}
//           <button
//             onClick={copyPasswordToClipboard}
//             className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
//           >
//             Copy
//           </button>
//         </div>

//         {/* range bar */}
//         <div className="flex text-sm gap-x-2">
//           <div className="flex items-center ">
//             <input
//               type="range"
//               min={6}
//               max={100}
//               value={length}
//               className="cursor-pointer"
//               onChange={(e) => {
//                 // event handler like onClick
//                 setLength(e.target.value); //e-->event target-->yani wo tag jis pr event laga ha
//               }}
//             />
//             <label>Length: {length}</label>
//           </div>
//           {/* checkbox 1 */}
//           <div className="flex items-center gap-x-1">
//             <input
//               type="checkbox"
//               defaultChecked={numberAllowed}
//               id="numberInput"
//               onChange={() => {
//                 setNumberAllowed((prev) => !prev);
//               }}
//             />
//             <label htmlFor="numberInput">Numbers</label>
//           </div>

//           {/* checkbox 2 */}
//           <div className="flex items-center gap-x-1">
//             <input
//               type="checkbox"
//               defaultChecked={charAllowed} //Sets the checkbox to un-checked initially if charAllowed state is false in hook.
//               id="characterInput"
//               onChange={() => {
//                 setCharAllowed((prev) => !prev); // previously box unchecked tha tau wo ab not unchecked hogya
//               }}
//             />
//             <label htmlFor="characterInput">Characters</label>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

/////////////////////////////////////////////////

import { useCallback, useEffect, useState, useRef } from "react";
import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [buttonColor, setButtonColor] = useState("bg-blue-700"); // Button color state

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += " !@#$%^&*()-_=+[]{}|;:~` ";

    for (let i = 1; i <= length; i++) {         // getting length from useState length variable
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator(); // Generate initial password
  }, [passwordGenerator]); // Only depend on passwordGenerator for initial execution

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);

    setButtonColor("bg-green-700"); // Change color to green on click
    setTimeout(() => setButtonColor("bg-blue-700"), 500); // Revert back to blue after 0.5s
  }, [password]);

  const handleNumberCheckboxChange = () => {
    setNumberAllowed((prev) => !prev); // Toggle number allowance
    passwordGenerator(); // Re-generate password
  };

  const handleCharacterCheckboxChange = () => {
    setCharAllowed((prev) => !prev); // Toggle character allowance
    passwordGenerator(); // Re-generate password
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`outline-none ${buttonColor} text-white px-3 py-0.5 shrink-0`}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={handleNumberCheckboxChange}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={handleCharacterCheckboxChange}              
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// Here, defaultChecked is not a standard HTML attribute for the <input> element. However, React doesn't throw an error because it's a common
//  pattern in React to use props that might not directly map to HTML attributes. Instead, React treats it as a custom prop and you can handle it in your component logic.
// ================================================

// Yes, that's correct! When you use the useCallback hook in React, it memoizes the function, meaning it returns a memoized version of the function. This memoized version of 
// the function will remain the same between renders unless one of the dependencies specified 
// in the dependency array changes. If none of the dependencies change, React will reuse the same function instance, avoiding unnecessary re-creation of the function on each render.
