const flow = [
  ['goal', 'Hi! I’m GeoPlan Buddy. What would you like your map or GIS analysis to help you understand?'],
  ['area', 'What city, county, or region will your project cover?'],
  ['method', 'How would you like to approach the analysis? For park projects, choose straight-line proximity or walking access. For other projects, briefly describe your intended method, or say “not sure.”'],
  ['deliverable', 'Who is this for, and what do you need to deliver? For example: a PDF map for my instructor.'],
  ['software', 'What GIS software will you use, and how experienced are you with it?'],
  ['deadline', 'When is it due? A relative deadline such as “two weeks” is fine.'],
  ['hours', 'How many total work hours can you spend? Enter a number, such as 4 or 10.'],
  ['data', 'What data do you already have? You can say “none yet” or “not sure.”']
];
let stage = 0, answers = {}, transcript = [];
const messages = document.querySelector('#messages');
const input = document.querySelector('#message');
const form = document.querySelector('#composer');
const hints = document.querySelector('#hints');
function say(role, text) {
  transcript.push({role,text});
  const row = document.createElement('div'); row.className='message '+role;
  const avatar=document.createElement('span'); avatar.className='avatar'; avatar.textContent=role==='bot'?'G':'You';
  const bubble=document.createElement('div'); bubble.className='bubble'; bubble.textContent=text;
  row.append(avatar,bubble); messages.append(row); row.scrollIntoView({block:'end',behavior:'smooth'});
}
function chips(items) {
  hints.replaceChildren();
  items.forEach(label=>{const b=document.createElement('button'); b.type='button'; b.textContent=label; b.onclick=()=>submit(label); hints.append(b);});
}
function ask() {
  say('bot',flow[stage][1]);
  const options={goal:['Map park proximity','Plan a flood-risk mapping project','Organize my GIS assignment'],method:['Straight-line proximity','Walking access','Not sure yet'],hours:['4','10','20'],data:['None yet','I have some datasets']};
  chips(options[flow[stage][0]]||[]);
}
function summary() {
  return `Here’s the scope I captured:\n\nGoal: ${answers.goal}\nStudy area: ${answers.area}\nMethod: ${answers.method}\nAudience / deliverable: ${answers.deliverable}\nSoftware / experience: ${answers.software}\nDeadline: ${answers.deadline}\nAvailable effort: ${answers.hours} hours\nExisting data: ${answers.data}\n\nDoes this look right? Choose “Create my plan,” or start over to change these details.`;
}
function makePlan(a) {
  const hours=Number(a.hours), weights=[.12,.25,.18,.2,.15,.1];
  const units=Math.round(hours*100);let left=units;
  const effort=weights.map((w,i)=>{const n=i===weights.length-1?left:Math.floor(units*w);left-=n;return(n/100).toFixed(2);});
  const park=/park/i.test(a.goal), walking=/walk|network|travel time/i.test(a.method), uncertain=/not sure|unsure|don't know/i.test(a.method);
  const limited=hours<=4;
  const phases=['Confirm the question, extent, method and output','Find candidate data and review coverage, dates and licenses','Prepare layers; check attributes, spatial references and units','Run one clearly defined analysis or create a pilot map','Style the map and write the method and limitations','Check representative cases and export the deliverable'];
  const schedule=phases.map((p,i)=>`${i+1}. ${p} — ${effort[i]} hours`).join('\n');
  let methodNote=walking?'Walking access requires a suitable routable network, travel assumptions, and usable destination entrances. Straight-line buffers cannot substitute for walking routes. If those data are unavailable, agree on a different question or deliver a feasibility prototype.':park?'Choose and justify a straight-line threshold before analysis. Park polygons and park points represent different distance origins. Buffers measure proximity, not walking access, park quality, or service capacity.':'Confirm that the proposed method answers the project question. Check required inputs before selecting analysis tools.';
  if(uncertain)methodNote='Method is unresolved. Use the first milestone to agree on a method and required inputs; the analysis task below is conditional. '+methodNote;
  return `YOUR GIS PROJECT PLAN\n\n${a.goal}\n${a.area}\n\nOBJECTIVE & OUTPUT\nPrepare a scoped project addressing “${a.goal}” in ${a.area}. Intended audience / output: ${a.deliverable}. Software / experience: ${a.software}.\n\nSCOPE\n${limited?'With this short effort budget, start with one small pilot area, readily usable data, and one draft map. Full coverage and a validated analysis may not be achievable.':'Use one primary question and analysis method. Reduce the extent or deliverable if data preparation exceeds the estimate.'}\nExclude detailed demographic conclusions, field validation, and unsupported access claims unless separately resourced.\n\nMETHOD DECISION\nUser-proposed method: ${a.method}. ${methodNote}\n\nDATA CHECKLIST\n• Study-area boundary: candidate official local or regional open-data source.\n• Features relevant to the question: ${park?'public park locations or boundaries; verify all relevant operators and public access.':'identify the thematic layers required by the chosen method.'}\n${walking?'• Routable network and entrance locations: verify connectivity, barriers and pedestrian restrictions.\n':''}• Existing data reported by you: ${a.data}. These files have not been inspected.\nAll sources and availability remain unverified. Check dates, completeness, licensing, required attributes and geographic coverage. Consider features just outside the study boundary that may affect edge results.\n\nWORK PLAN — ${hours} TOTAL HOURS\n${schedule}\n\nMILESTONES & DEPENDENCIES\nDeadline reported: ${a.deadline}. These are effort allocations, not calendar appointments. Fit them into your actual availability. Confirm the scope before acquiring data, validate inputs before analysis, and review results before exporting. If suitable data cannot be found in the allocated time, reduce the scope and document the limitation.\n\nRISKS & QUALITY CHECKS\n• Effort is a template estimate; feasibility depends on data readiness.\n• Use a suitable distance/area method and units. Do not treat latitude/longitude degrees as meters.\n• Check alignment, missing features, geometry and a few representative locations.\n• Include a clear title, readable legend, units, data dates, acknowledgments and limitations.\n• Protect sensitive locations; explain omitted areas and population/data gaps.\n• Confirm the output answers the question without claiming unperformed analysis.\n\nFIRST ACTION\nWrite a one-sentence scope and check whether an authoritative study-area boundary and the main thematic dataset are available.\n\nThis is a rule-based draft built from your answers. No data search, spatial analysis or dataset verification has been performed.`;
}
function submit(raw) {
  const text=raw.trim();if(!text)return;
  if(text.length>1200){say('bot','Please keep each answer under 1,200 characters.');return;}
  input.value='';say('user',text);
  if(stage<flow.length) {
    const key=flow[stage][0];
    if(key==='hours') {
      const match=text.match(/^\s*(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)?\s*$/i);
      if(!match||Number(match[1])<1||Number(match[1])>1000){say('bot','Please enter total available work hours from 1 to 1,000, such as “4” or “10 hours.”');return;}
      answers[key]=Number(match[1]);
    }else answers[key]=text;
    stage++;
    if(stage<flow.length)ask();else{say('bot',summary());chips(['Create my plan','Start over']);}
  }else if(/^start over$/i.test(text))reset();
  else if(/^create my plan$/i.test(text)){say('bot',makePlan(answers));chips(['Start over']);}
  else{
    const changed=text.match(/(?:^|\b)(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\b/i);
    if(changed&&Number(changed[1])>=1&&Number(changed[1])<=1000){answers.hours=Number(changed[1]);say('bot',`Updated available effort to ${answers.hours} hours.\n\n`+makePlan(answers));chips(['Start over']);}
    else{say('bot','I can create your captured plan, revise its total hours, or start a new project. Try “Create my plan,” “Change to 4 hours,” or “Start over.” This guided prototype does not answer general GIS questions.');chips(['Create my plan','Start over']);}
  }
}
function reset(){stage=0;answers={};transcript=[];messages.replaceChildren();input.value='';ask();}
form.addEventListener('submit',e=>{e.preventDefault();submit(input.value);});
document.querySelector('#new').onclick=()=>{reset();input.focus();};
document.querySelector('#export').onclick=()=>{const content=transcript.map(x=>(x.role==='bot'?'GeoPlan Buddy':'You')+':\n'+x.text).join('\n\n');const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='geoplan-buddy-conversation.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
reset();
