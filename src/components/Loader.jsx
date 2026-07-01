import { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';
export function Loader(){const [show,setShow]=useState(true);useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setShow(false);return}const t=setTimeout(()=>setShow(false),800);return()=>clearTimeout(t)},[]);return show?<div className="loader"><BrandMark/><i/></div>:null}
