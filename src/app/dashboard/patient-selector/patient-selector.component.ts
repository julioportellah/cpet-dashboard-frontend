import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { CpetService } from '../../service/cpet.service';

interface Sessions {
  value: string;
  viewValue: number;
}
@Component({
  selector: 'app-patient-selector',
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.css']
})
export class PatientSelectorComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();
  selectedValue:string;
  sessionsListed: any;
  constructor(private cpetService: CpetService) {
    let selectedSession =sessionStorage.getItem('selectedSession');
    if(selectedSession!=null)
    {
      this.SelectSession(selectedSession.toString());
      this.selectedValue = selectedSession;
      this.selected.emit(this.selectedValue);
    }
   }

  ngOnInit(): void {
  }
  
  SelectSession(selectedSession:string){
    this.selected.emit(selectedSession);
    sessionStorage.setItem('selectedSession', selectedSession);
  }

  //Note: this is an antipattern but a good MVP solution  
  sessions: Sessions[] = [
    {value: '0', viewValue:7},
    {value: '1',   viewValue:8},
    {value: '2',   viewValue:9},
    {value: '3',   viewValue:10},
    {value: '4',   viewValue:11},
    {value: '5',   viewValue:12},
    {value: '6',   viewValue:13},
    {value: '7',   viewValue:14},
    {value: '8',   viewValue:15},
    {value: '9',   viewValue:17},
    {value: '10',  viewValue:18},
    {value: '11',  viewValue:19},
    {value: '12',  viewValue:20},
    {value: '13',  viewValue:21},
    {value: '14',  viewValue:23},
    {value: '15',  viewValue:24},
    {value: '16',  viewValue:25},
    {value: '17',  viewValue:26},
    {value: '18',  viewValue:27},
    {value: '19',  viewValue:28},
    {value: '20',  viewValue:29},
    {value: '21',  viewValue:30},
    {value: '22',  viewValue:31},
    {value: '23',  viewValue:32},
    {value: '24',  viewValue:33},
    {value: '25',  viewValue:34},
    {value: '26',  viewValue:35},
    {value: '27',  viewValue:36},
    {value: '28',  viewValue:37},
    {value: '29',  viewValue:38},
    {value: '30',  viewValue:39},
    {value: '31',  viewValue:40},
    {value: '32',  viewValue:41},
    {value: '33',  viewValue:42},
    {value: '34',  viewValue:43},
    {value: '35',  viewValue:44},
    {value: '36',  viewValue:45},
    {value: '37',  viewValue:46},
    {value: '38',  viewValue:47},
    {value: '39',  viewValue:48},
    {value: '40',  viewValue:49},
    {value: '41',  viewValue:50},
    {value: '42',  viewValue:51},
    {value: '43',  viewValue:52},
    {value: '44',  viewValue:53},
    {value: '45',  viewValue:54},
    {value: '46',  viewValue:55},
    {value: '47',  viewValue:56},
    {value: '48',  viewValue:57},
    {value: '49',  viewValue:58},
    {value: '50',  viewValue:59},
    {value: '51',  viewValue:60},
    {value: '52',  viewValue:61},
    {value: '53',  viewValue:62},
    {value: '54',  viewValue:63},
    {value: '55',  viewValue:64},
    {value: '56',  viewValue:65.1},
    {value: '57',  viewValue:65.2},
    {value: '58',  viewValue:66},
    {value: '59',  viewValue:67},
    {value: '60',  viewValue:68},
    {value: '61',  viewValue:69},
    {value: '62',  viewValue:70},
    {value: '63',  viewValue:71},
    {value: '64',  viewValue:72},
    {value: '65',  viewValue:73},
    {value: '66',  viewValue:74},
    {value: '67',  viewValue:75},
    {value: '68',  viewValue:76},
    {value: '69',  viewValue:77.1},
    {value: '70',  viewValue:77.2},
    {value: '71',  viewValue:78.1},
    {value: '72',  viewValue:78.2},
    {value: '73',  viewValue:79},
    {value: '74',  viewValue:80.1},
    {value: '75',  viewValue:81},
    {value: '76',  viewValue:82},
    {value: '77',  viewValue:83},
    {value: '78',  viewValue:84},
    {value: '79',  viewValue:85},
    {value: '80',  viewValue:86},
    {value: '81',  viewValue:87},
    {value: '82',  viewValue:88},
    {value: '83',  viewValue:89},
    {value: '84',  viewValue:90},
    {value: '85',  viewValue:91},
    {value: '86',  viewValue:92},
    {value: '87',  viewValue:93},
    {value: '88',  viewValue:94},
    {value: '89',  viewValue:95},
    {value: '90',  viewValue:96},
    {value: '91',  viewValue:97},
    {value: '92',  viewValue:98},
    {value: '93',  viewValue:99},
    {value: '94',  viewValue:100},
    {value: '95',  viewValue:101},
    {value: '96',  viewValue:102},
    {value: '97',  viewValue:103},
    {value: '98',  viewValue:104},
    {value: '99',  viewValue:105},
    {value: '100', viewValue:106},
    {value: '101', viewValue:107},
    {value: '102', viewValue:108},
    {value: '103', viewValue:109},
    {value: '104', viewValue:114},
    {value: '105', viewValue:115},
    {value: '106', viewValue:116},
    {value: '107', viewValue:117},
    {value: '108', viewValue:118},
    {value: '109', viewValue:119},
    {value: '110', viewValue:120},
    {value: '111', viewValue:121},
    {value: '112', viewValue:122},
    {value: '113', viewValue:123},
    {value: '114', viewValue:124},
    {value: '115', viewValue:125},
    {value: '116', viewValue:126},
    {value: '117', viewValue:127},
    {value: '118', viewValue:128},
    {value: '119', viewValue:129},
    {value: '120', viewValue:130},
    {value: '121', viewValue:131},
    {value: '122', viewValue:132},
    {value: '123', viewValue:133},
    {value: '124', viewValue:134},
    {value: '125', viewValue:135},
    {value: '126', viewValue:136},
    {value: '127', viewValue:137},
    {value: '128', viewValue:138},
    {value: '129', viewValue:139},
    {value: '130', viewValue:140},
    {value: '131', viewValue:141},
    {value: '132', viewValue:142},
    {value: '133', viewValue:143},
    {value: '134', viewValue:144},
    {value: '135', viewValue:145},
    {value: '136', viewValue:146},
    {value: '137', viewValue:148.1},
    {value: '138', viewValue:148.2},
    {value: '139', viewValue:149},
    {value: '140', viewValue:150},
    {value: '141', viewValue:151},
    {value: '142', viewValue:152.1},
    {value: '143', viewValue:152.2},
    {value: '144', viewValue:153},
    {value: '145', viewValue:154},
    {value: '146', viewValue:155},
    {value: '147', viewValue:156},
    {value: '148', viewValue:157},
    {value: '149', viewValue:158},
    {value: '150', viewValue:159},
    {value: '151', viewValue:160},
    {value: '152', viewValue:161},
    {value: '153', viewValue:162},
    {value: '154', viewValue:163},
    {value: '155', viewValue:164},
    {value: '156', viewValue:165},
    {value: '157', viewValue:166},
    {value: '158', viewValue:167},
    {value: '159', viewValue:168},
    {value: '160', viewValue:169},
    {value: '161', viewValue:170},
    {value: '162', viewValue:171},
    {value: '163', viewValue:172},
    {value: '164', viewValue:173},
    {value: '165', viewValue:174},
    {value: '166', viewValue:175},
    {value: '167', viewValue:176},
    {value: '168', viewValue:177},
    {value: '169', viewValue:178.1},
    {value: '170', viewValue:178.2},
    {value: '171', viewValue:180},
    {value: '172', viewValue:181},
    {value: '173', viewValue:183},
    {value: '174', viewValue:184},
    {value: '175', viewValue:185},
    {value: '176', viewValue:186},
    {value: '177', viewValue:187},
    {value: '178', viewValue:188},
    {value: '179', viewValue:189},
    {value: '180', viewValue:190},
  ];

}

