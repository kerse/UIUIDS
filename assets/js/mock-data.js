window.OpsData={
assets:[
{id:'AST-0421',name:'Northline cold-chain trailer 14',type:'Vehicle',status:'At risk',location:'Belgrade · Hub North',owner:'M. Petrovic',util:91,cost:18420,sla:'01:42',updated:'2 min ago',confidence:94},
{id:'AST-0408',name:'Kragujevac line-haul tractor 08',type:'Vehicle',status:'Healthy',location:'Kragujevac · Depot',owner:'A. Jovanovic',util:78,cost:12980,sla:'—',updated:'5 min ago',confidence:98},
{id:'AST-0399',name:'Last-mile routing cluster: South-East',type:'Digital service',status:'Warning',location:'Niš · Edge region',owner:'I. Markovic',util:86,cost:8640,sla:'00:28',updated:'1 min ago',confidence:76},
{id:'AST-0388',name:'Intermodal container pool / EMEA-27',type:'Asset pool',status:'Healthy',location:'Pančevo · Terminal',owner:'S. Nikolic',util:64,cost:46200,sla:'—',updated:'11 min ago',confidence:97},
{id:'AST-0376',name:'West corridor temperature gateway',type:'Sensor network',status:'Incident',location:'Šabac · Relay 3',owner:'L. Stojanovic',util:0,cost:7210,sla:'00:12',updated:'now',confidence:88},
{id:'AST-0364',name:'Cross-border customs document pipeline',type:'Digital service',status:'Healthy',location:'Horgoš · Border',owner:'E. Kovacevic',util:72,cost:11490,sla:'—',updated:'9 min ago',confidence:91},
{id:'AST-0352',name:'Automated warehouse picking cell B-16',type:'Equipment',status:'Maintenance',location:'Novi Sad · DC-2',owner:'V. Radic',util:43,cost:33080,sla:'06:18',updated:'14 min ago',confidence:82},
{id:'AST-0347',name:'Regional fuel reconciliation feed',type:'Financial feed',status:'Warning',location:'Belgrade · Finance',owner:'D. Tomic',util:68,cost:1920,sla:'02:06',updated:'3 min ago',confidence:69},
{id:'AST-0331',name:'Refrigerated cargo telemetry mesh',type:'Sensor network',status:'Healthy',location:'Čačak · Fleet',owner:'M. Petrovic',util:88,cost:9760,sla:'—',updated:'7 min ago',confidence:96},
{id:'AST-0319',name:'Adriatic returns consolidation route',type:'Route',status:'At risk',location:'Bar · Port',owner:'A. Jovanovic',util:93,cost:15340,sla:'00:54',updated:'2 min ago',confidence:85},
{id:'AST-0311',name:'Supplier ETA prediction service',type:'Digital service',status:'Healthy',location:'Belgrade · Core',owner:'I. Markovic',util:58,cost:6340,sla:'—',updated:'6 min ago',confidence:92},
{id:'AST-0298',name:'MHE battery pack / NH-884',type:'Equipment',status:'Maintenance',location:'Novi Sad · DC-2',owner:'V. Radic',util:21,cost:2880,sla:'10:42',updated:'22 min ago',confidence:73},
{id:'AST-0283',name:'Balkan express lane allocation',type:'Route',status:'Healthy',location:'Dimitrovgrad · Border',owner:'S. Nikolic',util:81,cost:21270,sla:'—',updated:'4 min ago',confidence:95},
{id:'AST-0276',name:'Packaging variance model v3.8',type:'Analytics model',status:'Warning',location:'Belgrade · Core',owner:'D. Tomic',util:66,cost:4150,sla:'03:11',updated:'12 min ago',confidence:63},
{id:'AST-0269',name:'Niš outbound sortation lane 04',type:'Equipment',status:'Incident',location:'Niš · DC-1',owner:'L. Stojanovic',util:0,cost:17760,sla:'00:09',updated:'now',confidence:90},
{id:'AST-0252',name:'Fleet insurance claim register',type:'Financial feed',status:'Healthy',location:'Belgrade · Finance',owner:'E. Kovacevic',util:39,cost:9280,sla:'—',updated:'18 min ago',confidence:99}
],
events:[['14:32:08','warning','Temperature drift detected','AST-0421 · 8.7°C above baseline'],['14:31:56','success','Route checkpoint received','RT-728 · Horgoš border'],['14:31:40','danger','Gateway packet loss 18.2%','AST-0376 · relay 3'],['14:31:20','info','Cost reconciliation completed','Fuel ledger · 3,812 records'],['14:30:59','warning','SLA threshold reached','Task OPS-2198 · 12 min left'],['14:30:21','success','Maintenance work order closed','AST-0298 · battery replacement']],
alerts:[
{id:'ALT-8804',sev:'Critical',title:'Temperature excursion threatens refrigerated shipment',entity:'AST-0421 · Northline trailer 14',impact:'€18,420 exposure',owner:'Unassigned',state:'Open',confidence:94,reason:'Compressor cycle is 41% below fleet baseline.',action:'Dispatch mobile technician before 15:10.'},
{id:'ALT-8798',sev:'High',title:'Sortation lane 04 is below minimum throughput',entity:'AST-0269 · Niš outbound',impact:'312 parcels delayed',owner:'L. Stojanovic',state:'Acknowledged',confidence:90,reason:'Motor thermal cutoff repeated three times.',action:'Switch volume to lane 06 and create maintenance task.'},
{id:'ALT-8781',sev:'Medium',title:'Fuel spend variance exceeds forecast',entity:'RT-728 · Balkan express',impact:'€6,780 forecast variance',owner:'D. Tomic',state:'Open',confidence:78,reason:'Cross-border idle time shifted above plan.',action:'Review toll and idle-time allocation.'},
{id:'ALT-8764',sev:'Medium',title:'Prediction model confidence degraded',entity:'AST-0276 · Packaging variance',impact:'Forecast quality at risk',owner:'I. Markovic',state:'Open',confidence:63,reason:'Input sample mix changed after supplier rollout.',action:'Recalibrate model with July cohort.'}
],
tasks:[
{id:'OPS-2198',title:'Validate cold-chain exception and dispatch technician',priority:'P1',assignee:'Unassigned',sla:'12 min',state:'New',next:'Assign field team'},
{id:'OPS-2193',title:'Reconcile customs documents for Horgoš batch 776',priority:'P2',assignee:'E. Kovacevic',sla:'42 min',state:'In progress',next:'Review 2 missing declarations'},
{id:'OPS-2187',title:'Rebalance outbound capacity for Niš lane 04',priority:'P1',assignee:'L. Stojanovic',sla:'09 min',state:'In progress',next:'Move 312 parcels'},
{id:'OPS-2179',title:'Confirm fuel ledger source mapping',priority:'P3',assignee:'D. Tomic',sla:'3 h',state:'Waiting',next:'Await finance feed'},
{id:'OPS-2172',title:'Approve planned battery maintenance window',priority:'P3',assignee:'V. Radic',sla:'6 h',state:'New',next:'Confirm dock slot'}
],
logs:[['14:32:08.412','system:anomaly-engine','alert.triggered','AST-0421','telemetry','warning'],['14:31:56.903','user:eva.kovacevic','document.approved','DOC-776-EMEA','web','success'],['14:31:40.113','service:edge-relay-3','connection.degraded','AST-0376','agent','error'],['14:30:59.663','user:marko.petrovic','task.updated','OPS-2198','web','info'],['14:30:21.070','service:maintenance','workorder.closed','WO-4881','api','success'],['14:29:53.001','user:danilo.tomic','view.exported','EXP-449','web','info']]
};
