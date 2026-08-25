import { Check, X } from "lucide-react";
import type { Question } from "./types";

type Puzzle = NonNullable<Question["puzzle"]>;
type Kind = "triangle" | "plus" | "square" | "rect" | "v";
type CellSpec = { kind: Kind; count: number; color?: string; size?: "sm" | "md" | "lg"; marker?: number; markerCorner?: number; layout?: number; positions?: number[] };
const spots = [[28,27],[52,27],[76,27],[28,50],[52,50],[76,50],[28,73],[52,73],[76,73]];

function Shape({ kind, color = "#b8d334", size = "md" }: Pick<CellSpec,"kind"|"color"|"size">) {
  const n=size==="sm"?12:size==="lg"?22:17;
  if(kind==="triangle") return <span style={{width:0,height:0,borderLeft:`${n/2}px solid transparent`,borderRight:`${n/2}px solid transparent`,borderBottom:`${n}px solid ${color}`,filter:"drop-shadow(0 0 1px #334155)"}} />;
  if(kind==="plus") return <span className="font-black leading-none text-slate-950" style={{fontSize:n+8}}>+</span>;
  if(kind==="v") return <span className="font-black leading-none text-slate-950" style={{fontSize:n+5}}>V</span>;
  if(kind==="rect") return <span className="border-[3px] border-slate-950" style={{width:n+14,height:n,background:color}} />;
  return <span className="border-2 border-slate-950" style={{width:n,height:n,background:color}} />;
}
function Cell({ spec, empty=false }: { spec: CellSpec; empty?: boolean }) {
  const corners=[["4%","4%"],["82%","4%"],["82%","84%"],["4%","84%"]]; const corner=spec.markerCorner??0;
  return <div className={`relative aspect-square border border-slate-400 bg-white ${empty?"bg-slate-50":""}`}>{!empty&&Array.from({length:spec.count},(_,i)=>{const p=spots[spec.positions?.[i]??((i*2+(spec.layout??0))%spots.length)];return <span key={i} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{left:`${p[0]}%`,top:`${p[1]}%`}}><Shape kind={spec.kind} color={spec.color} size={spec.size}/></span>})}{!empty&&Array.from({length:spec.marker??0},(_,i)=>{const position=corners[(corner+i)%corners.length]; return <span key={`m${i}`} className="absolute h-2.5 w-4 bg-slate-400" style={{left:position[0],top:position[1]}} />})}</div>;
}
const spec=(kind:Kind,count:number,extra:Partial<CellSpec>={}):CellSpec=>({kind,count,...extra});
function setup(p:Puzzle):{cells:CellSpec[];missing:number;options:CellSpec[]} {
  if(p==="triangle-merge") { const rows=[[ [0,8],[1,7],[2,6],[0,1,2,6,7,8] ],[[0,6],[1,4,7],[2,8],[0,1,2,4,6,7,8]],[[1,7],[0,2,6,8],[4],[0,1,2,4,6,7,8]],[[0,4,8],[2,6],[1,7],[0,1,2,4,6,7,8]]]; const cells=rows.flat().map((positions)=>spec("triangle",positions.length,{color:"#447aa8",positions})); return {cells,missing:3,options:[spec("triangle",6,{color:"#447aa8",positions:[0,1,2,6,7,8]}),spec("triangle",5,{color:"#447aa8",positions:[0,1,2,6,7]}),spec("triangle",6,{color:"#447aa8",positions:[0,1,2,4,6,7]}),spec("triangle",6,{color:"#447aa8",positions:[0,1,2,6,7,8],layout:2}),spec("triangle",4,{color:"#447aa8",positions:[0,1,6,7]}),spec("triangle",7,{color:"#447aa8",positions:[0,1,2,4,6,7,8]})]}; }
  if(p==="color-cycle") { const colors=["#b9cbd8","#000","#fff","#d93636"]; const cells=Array.from({length:16},(_,i)=>spec("square",1,{color:colors[(i%4+Math.floor(i/4))%4],marker:1,markerCorner:(i%4+Math.floor(i/4))%4,layout:i})); return {cells,missing:9,options:[spec("square",1,{color:"#000",marker:1,markerCorner:3}),spec("square",1,{color:"#d93636",marker:1,markerCorner:3}),spec("square",1,{color:"#fff",marker:1,markerCorner:3}),spec("square",1,{color:"#b9cbd8",marker:1,markerCorner:3}),spec("square",1,{color:"#000",marker:1,markerCorner:2}),spec("square",1,{color:"#d93636",marker:1,markerCorner:2})]}; }
  if(p==="size-links") { const pattern:["lg"|"md"|"sm",number][]=[["lg",2],["md",3],["sm",2],["lg",3],["md",3],["sm",3],["lg",2],["md",2],["sm",2],["lg",3],["md",1],["sm",2],["lg",1],["md",2],["sm",2],["lg",3]]; return {cells:pattern.map(([size,marker],i)=>spec("triangle",1,{size,marker,layout:i})),missing:9,options:[spec("triangle",1,{size:"lg",marker:3}),spec("triangle",1,{size:"lg",marker:2}),spec("triangle",1,{size:"md",marker:2}),spec("triangle",1,{size:"md",marker:3}),spec("triangle",1,{size:"sm",marker:2}),spec("triangle",1,{size:"sm",marker:3})]}; }
  if(p==="plus-triangles") { const kinds=["triangle","plus","triangle","plus","plus","triangle","plus","triangle","triangle","plus","triangle","plus","plus","triangle","plus","triangle"] as Kind[]; const cells=kinds.map((kind,i)=>spec(kind,kind==="plus"?2:3,{layout:i})); return {cells,missing:14,options:[spec("plus",1),spec("plus",2),spec("triangle",3),spec("plus",3),spec("plus",2,{layout:2}),spec("triangle",2)]}; }
  if(p==="rect-plus") { const cells=Array.from({length:16},(_,i)=>spec("rect",1,{color:Math.floor(i/4)%2?"#9dbbd3":"#fff",marker:(i%4)+1,layout:i})); return {cells,missing:5,options:[spec("rect",1,{color:"#9dbbd3",marker:2}),spec("rect",1,{color:"#fff",marker:2}),spec("rect",1,{color:"#9dbbd3",marker:3}),spec("rect",1,{color:"#fff",marker:3}),spec("rect",1,{color:"#9dbbd3",marker:1}),spec("rect",1,{color:"#9dbbd3",marker:2,layout:3})]}; }
  const kinds=["v","square","v","square","square","v","square","v","v","square","v","square","square","v","square","v"] as Kind[]; return {cells:kinds.map((kind,i)=>spec(kind,kind==="v"?2:1,{color:"#d93636",layout:i})),missing:0,options:[spec("v",2),spec("v",3),spec("square",1,{color:"#d93636"}),spec("v",2,{layout:2}),spec("square",2,{color:"#d93636"}),spec("v",1)]};
}

export function ProblemPuzzle({ puzzle, selected, correct, onSelect, de }: { puzzle:Puzzle; selected:number|null; correct:number; onSelect:(i:number)=>void; de:boolean }) {
  const data=setup(puzzle); return <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center"><div className="mx-auto grid w-full max-w-[500px] grid-cols-4 gap-2">{data.cells.map((cell,i)=><Cell key={i} spec={cell} empty={i===data.missing}/>)}</div><div><p className="mb-3 text-sm italic text-slate-500">{de?"Wähle die passende Ergänzung.":"Choose the matching tile."}</p><div className="grid grid-cols-2 gap-2">{data.options.map((option,i)=>{const good=selected!==null&&i===correct,bad=selected===i&&!good;return <button key={i} type="button" onClick={()=>onSelect(i)} className={`relative rounded-lg border-2 p-1 transition ${good?"border-emerald-500 bg-emerald-50":bad?"border-rose-500 bg-rose-50":"border-slate-200 hover:border-indigo-400"}`}><Cell spec={option}/>{good&&<Check className="absolute right-1 top-1 h-4 w-4 text-emerald-600"/>}{bad&&<X className="absolute right-1 top-1 h-4 w-4 text-rose-600"/>}</button>})}</div></div></div>;
}
