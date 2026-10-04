/* Storyline content for the booth page.
   Edit this file to change industries, use cases and demo steps.
   ROWS order = cube faces: 0 front, 1 right, 2 top (rot = [rotateX, rotateY] that shows the face). */

const N='var(--navy)',R='#E31B23';
const ICONS=[
 `<svg viewBox="0 0 64 64" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 56V32l12 7v-7l12 7v-7l12 7V12h8v44z" style="stroke:${N}"/><path d="M4 56h56" style="stroke:${N}"/><rect x="11" y="45" width="6" height="5" stroke="${R}"/><rect x="23" y="45" width="6" height="5" stroke="${R}"/><rect x="35" y="45" width="6" height="5" stroke="${R}"/><path d="M48 6c2-2 4-2 6 0" stroke="${R}"/></svg>`,
 `<svg viewBox="0 0 64 64" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 26v30h44V26" style="stroke:${N}"/><path d="M8 14h48l4 10H4z" style="stroke:${N}"/><path d="M4 24c0 3 2.7 5 6 5s6-2 6-5c0 3 2.7 5 6 5s6-2 6-5c0 3 2.7 5 6 5s6-2 6-5c0 3 2.7 5 6 5s6-2 6-5" stroke="${R}"/><path d="M18 56V40h10v16" style="stroke:${N}"/><rect x="34" y="38" width="14" height="10" rx="1" style="stroke:${N}"/><path d="M4 56h56" style="stroke:${N}"/></svg>`,
 `<svg viewBox="0 0 64 64" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 4 22 58M32 4l10 54" style="stroke:${N}"/><path d="M12 16h40M16 26h32" style="stroke:${N}"/><path d="M27 26l10 12M37 26 27 38M25 38h14M24 44l16 14M40 44 24 58" style="stroke:${N}"/><path d="M12 16v4M52 16v4M16 26v4M48 26v4" stroke="${R}"/><path d="M4 20c4 3 6 3 8 0M52 20c2 3 4 3 8 0" stroke="${R}"/></svg>`
];
const APPS=`<svg viewBox="0 0 24 24" fill="none" stroke="#E31B23" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="3.5" width="19" height="17" rx="2"/><path d="M2.5 8h19"/><rect x="5.5" y="11" width="5.5" height="6.5" rx=".6"/><path d="M13.5 11.5h5M13.5 14.5h5M13.5 17.5h3"/></svg>`;
const TECH=[
 {n:"Genie + Ontology",tag:"Query data in natural language",logo:`<img src="assets/icons/genie.svg" alt="">`},
 {n:"Lakebase",tag:"Bridge analytics and operations",logo:`<img src="assets/icons/lakebase.png" alt="">`},
 {n:"Databricks Apps",tag:"Turn insight into action",logo:APPS}
];
const ROWS=[
 {ind:"Manufacturing",story:"From the Shop Floor to the Boardroom",org:"Quality & margin",
  prob:"A 2am line-down runs blind for three shifts, and the margin hit stays invisible until finance closes the books.",
  src:"MES · PLC/SCADA · SAP ERP · QMS",key:"Batch ID",rot:[0,0],
  demo:{len:"5 min",steps:[
   ["Lakebase","An inspector logs a defect on batch B-2291, written in under 10 ms."],
   ["Genie","The plant controller asks which SKUs lost margin last week, and why. The answer traces to scrap on Line 3."],
   ["App","The planner sees the Line 3 filler at high failure risk, with the cost of inaction, and schedules the fix."],
   ["Loop","The same batch ID links the defect, the margin loss and the work order."]]},
  cells:[
  {t:"Cost-to-produce & margin insights",p:"Margin impact is invisible until the month-end finance rollup.",v:"The plant controller asks which SKUs lost margin last week, and why, and gets an answer from real production data in minutes.",who:"Plant Controller",stack:["Genie space","Metric views","Unity Catalog"]},
  {t:"Quality & batch traceability store",p:"Batch, defect and genealogy records sit on shop-floor systems, out of reach for hours.",v:"Every batch, defect code and genealogy record is written in real time (sub-10 ms) and governed with the lakehouse.",who:"Quality Inspector, QA Manager",stack:["Lakebase Postgres","Synced tables","Unity Catalog"]},
  {t:"Predictive maintenance planner",p:"Maintenance reacts after the line has already gone down.",v:"Shows which machine will fail, by when, and the cost of inaction, so the planner acts before the next 2am outage.",who:"Maintenance Planner",stack:["Databricks Apps","Model Serving","Lakebase"]}]},
 {ind:"Retail & FMCG",story:"Promo Pulse",org:"NovaMart · 320 stores",
  prob:"Day 3 of the Festive Snack Fest: 18 stores run out of the hero SKU while 11 nearby stores hold 3+ weeks of cover.",
  src:"MySQL ERP & POS via Lakeflow Connect (managed CDC)",key:"SKU × store",rot:[0,-90],
  demo:{len:"5 min",steps:[
   ["Alert","07:00: the dashboard flags 18 stores at risk on Masala Crunch 200g."],
   ["Genie","07:05: Meera asks why, and where the surplus stock sits."],
   ["App","07:15: the app proposes 6 transfers, and Ravi approves them."],
   ["Lakebase","07:16: approvals land in Lakebase and store teams get the task. The forecast updates on the next run."]]},
  cells:[
  {t:"Category & promotion performance Q&A",p:"Sell-through, uplift and days of cover mean different things per team, so every question becomes an analyst ticket.",v:"Meera asks which stores will run out before the offer ends and where to pull stock from, and gets one governed answer.",who:"Meera, Category Manager",stack:["Genie space","Retail ontology","Unity Catalog"]},
  {t:"Real-time inventory & transfer store",p:"Store actions live in operational apps, cut off from sales and promotion data.",v:"Live stock, transfer requests and promo overrides are served to the app, and approvals are written back instantly.",who:"Store Operations",stack:["Lakebase Postgres","Synced forecasts","Unity Catalog"]},
  {t:"Promo Pulse command centre",p:"Moving stock means emails and phone calls, and nothing is tracked or learned from.",v:"Recommends transfers from stockout-risk scores. Ravi approves them in the app: 16 minutes from alert to action.",who:"Ravi, Store Ops · Anita, Regional Head",stack:["Databricks Apps","MLflow models","AI/BI dashboard"]}]},
 {ind:"Energy & Utilities",story:"Smart-Meter Revenue Protection",org:"Northbridge Power & Light · 1.6 M smart meters",
  prob:"A meter tamper takes about 60 days to find, inspect and penalise, and AT&C loss is stuck at 17.8% against a 13% target.",
  src:"HES (DLMS) via Kafka & Auto Loader · MDM · SAP IS-U · GIS",key:"Meter ID",rot:[-90,0],
  demo:{len:"5 min",steps:[
   ["Ingest","A magnet tamper alarm streams in from the HES in under a minute."],
   ["Genie","James finds transformer EG-7714 at 31% loss, and Harborview Cold Storage as the cause."],
   ["App","Tom inspects, records photo and GPS, and the penalty is approved on screen."],
   ["Lakebase","Emma sees the full case in under a second. Sarah sees approved vs collected."]]},
  cells:[
  {t:"Loss & recovery insights",p:"Every loss question waits on an analyst stitching meter, billing and GIS data in Excel.",v:"James finds transformer EG-7714 at 31% loss and the tampering consumer in three questions, on a CIM-aligned ontology.",who:"James Carter, Division Engineer",stack:["Genie space","Metric views","Unity Catalog"]},
  {t:"Inspection & recovery store",p:"Inspection outcomes sit on paper, so customer care can't see them.",v:"Inspections, approvals and payment plans are written in milliseconds. Customer care sees the full case in under a second.",who:"Emma Hughes, Customer Care",stack:["Lakebase Postgres","Synced tables","Unity Catalog"]},
  {t:"Revenue Protection Command",p:"Inspectors get an unranked list of 40 names and visit in random order.",v:"Routes ranked by revenue at risk. Tom records the tamper with photo and GPS, and the penalty is approved on screen.",who:"Tom Reynolds, Field Inspector",stack:["Databricks Apps","Model Serving","Lakebase"]}]}
];

