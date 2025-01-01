'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import { saveAs } from "file-saver";
import mergeImages from "merge-images";
import { ScratchCard } from "next-scratchcard";
import { useState } from "react";
import { ethers } from "ethers";
import { ABI } from "../../ABI";
import { TwitterShareButton } from "react-twitter-embed";
import Link from "next/link";


export default function Home() {

  const CONTRACT = '0x6579cfD742D8982A7cDc4C00102D3087F6c6dd8E'
  //let functionMetadata = 'tokenURI'
  //let metadataTest = 'https://ipfs.io/ipfs/QmcoeRsFYeHzPD9Gx84aKD3tjLUKjvPEMSmoPs2GQmHR1t/1'
  //let imageTest = 'https://ipfs.io/ipfs/QmY3DR3EKhLsZx1Dx1vM8HRc2xXvwjCJ6shdHV6pavc7eL/1.png'
  //const [mingleImage, setMingleImage] = useState("")
  const [id, setId] = useState("")
  const [bg, setBg] = useState("")
  const [face, setFace] = useState("")
  const [tw, setTw] = useState("")
  const [driveUrl, setDriveUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [pfp, setPfp] = useState(false)
  const [inpu, setInpu] = useState(false)
  const [fix, setFixed] = useState("items-center justify-items-center max-h-screen pt-7 pb-1 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]")


  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_NODE)

  const truePfp = () => {
    setPfp(true)
    setFixed("items-center justify-items-center max-h-screen pt-7 pb-1 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]")

  }

  const resetAll = () => {
    setPfp(false)
    setInpu(false)
    setId("")
    setBg("")
    setCopied(false)
  }

  const getMingleMetadata = async () => {
    setBg("")
    setFace("")
    setTw("")
    const mingleContract = new ethers.Contract(CONTRACT, ABI, provider)
    if (id == "") return
    const metadataMingles = await mingleContract.tokenURI(id)

    let url = 'https://ipfs.io/ipfs/' + metadataMingles.split("/")[2] + "/" + id
    let meta = await fetch(url)
    let dataJson = await meta.json()
    let BG = dataJson.attributes[0].value
    setBg("/assets/BG/" + BG + ".png")
    let FACE = dataJson.attributes[5].value
    setFace("/assets/Face/" + FACE + ".png")
    let TW = dataJson.attributes[4].value

    setTw("/assets/Tequila Worm/" + TW + ".png")
    //let urlImage = dataJson.image.split("/")

    //setMingleImage('https://ipfs.io/ipfs/' + urlImage[2] + "/" + id + ".png")

    let finalURL = "https://d9emswcmuvawb.cloudfront.net/" + id + ".png"
    setDriveUrl(finalURL)
    setInpu(true)
    setFixed("fixed items-center justify-items-center max-h-screen pt-7 pb-1 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]")
  }

  const saveImage = async () => {
    const name = "Mingle#" + id + ".png"
    mergeImages([bg, tw, face])
      .then(function (blob) {
        saveAs(blob, name);
      });

  }

  const savepfp = async () => {
    const name = "PFPMingle#" + id + ".png"
    const imge = document.getElementById("mingle")
    const data = await fetch(imge.src)
    const blob = await data.blob()
      .then(function (blob) {
        saveAs(blob, name);
      });

  }

  const getImage = async () => {
    const imge = document.getElementById("mingle")
    const data = await fetch(imge.src)
    const blob = await data.blob()

    try {
      const a = await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        })
      ])
      setCopied(true)
      console.log("Success")

    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div className={fix}>

      <h1 className={(styles.title, "text-4xl text-black font-[family-name:var(--font-hogfish)]")}>CONGRATULATIONS</h1>



      {!inpu && (
        <div className="text-center space-y-2 mb-6">
          <p className={"text-xl mt-5 mb-2 text-black font-[family-name:var(--font-pressura)]"}>Mingles:APED ID #</p>
          <input placeholder="Mingle ID" className={"text-black text-center text-base border border-red-500  rounded-md font-[family-name:var(--font-pressura)]"} onChange={e => setId(e.target.value)}></input>
          <button
            className="ms-2 center uppercase rounded-lg bg-red-500 p-1 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={getMingleMetadata}
          >Check Mingle
          </button>
        </div>
      )

      }

      {bg != "" && (


        <div className={"justify-items-center text-center space-y-5 space-x-2"}>

          <p className="text-xl text-center text-black my-1 font-[family-name:var(--font-pressura)]">Scratch to unbottle your Baby Mingle #{id}</p>
          <div className="rounded-">
            <ScratchCard onComplete={truePfp} finishPercent={60} brushSize={40} width={300} height={300}>

              {/*<Image src={bg} className="" alt="BG" width={300} height={300} />
              <Image src={tw} className={styles.divabsolute} alt="Face" width={300} height={300} />
              <Image src={face} className={styles.divabsolute} alt="Tequila Worm" width={300} height={300} />*/}
              <Image id="mingle" src={driveUrl} className={styles.divabsolute} alt="Tequila Worm" width={300} height={300} />


            </ScratchCard>
          </div>
          <p className="text-xl text-center text-black my-3 font-[family-name:var(--font-pressura)]">Scratch the above card by swiping on it</p>

          {pfp && (
            <>
              <button
                className="ms-2 center uppercase rounded-lg bg-red-500 p-2 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={saveImage}
              >Download
              </button>
              <button
                className="center uppercase rounded-lg bg-red-500 p-2 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={getImage} ////////////////////// falta   //////////
              >Copy to Share on x
              </button>
            </>
          )

          }
          {copied && (
            <>
              <p className="text-xl text-center text-black my-3 font-[family-name:var(--font-pressura)]">Use CTRL+V on X</p>
              <div className="text-2xl">
                <TwitterShareButton
                  url="are finally unbottled! @minglesnft Tequila Worm"

                />
              </div>
            </>
          )
          }


          {pfp &&
            (
              <div className="mt-10">
                <h1 className={(styles.title, "text-4xl mt-10 text-black font-[family-name:var(--font-hogfish)]")}>PFP FORMAT</h1>

                <Image className="my-2 my-5" id="mingle" src={driveUrl} alt="PFP Mingle" width={300} height={300} />

                <button
                  className="center uppercase rounded-lg bg-red-500 p-2 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  onClick={savepfp}
                >

                  Download

                </button>
              </div>
            )
          }




        </div>
      )
      }

      <Link onClick={resetAll} href={"/"}><Image className="mt-2" src={"/assets/MinglesLogo_Black 2.png"} alt="Mingles Logo" width={150} height={150} /></Link>
    </div>

  );
}

{/**

  <button type="button" onClick={getMingleMetadata}>get image</button>
      <button type="button" onClick={getImage}>save Imnage</button>

      <TwitterShareButton url={driveUrl} />

  <ScratchCard finishPercent={40} brushSize={30} width={500} height={500}>
              <div className={styles.customnft}>
                <Image src={bg} className={styles.customimage} alt="BG" width={500} height={500} />
                <Image src={tw} className={styles.divabsolute} alt="Face" width={500} height={500} />
                <Image src={face} className={styles.divabsolute} alt="Tequila Worm" width={500} height={500} />
              </div>
            </ScratchCard>

            <p>Scratch the above card by swiping on it</p>

            <div>
              <button type="button" onClick={saveImage}>Download</button>
            </div>
  
  */}