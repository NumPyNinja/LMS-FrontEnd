import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { Batch } from '../batch';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 250px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class BatchComponent implements OnInit {

  batchList: Batch[];

  batch: Batch;

  selectedBatches: Batch[];

  submitted: boolean;

  programSize: number;
  visibility: boolean = false;
  batchDialogue: boolean;

  status: string[] = ['ACTIVE', 'INACTIVE'];
  // programList : Program[];


   programList :Program[];
   
  //  = [
  //   {
  //     "programId": "9",
  //     "programName": "dart-n-flutter",
  //     "programDescription": "not launched course",
  //     "programStatus": "notActive"
  //   },
  //   {
  //     "programId": "12",
  //     "programName": "MEAN stack",
  //     "programDescription": "not launched course",
  //     "programStatus": "notActive"
  //   },
  //   {
  //     "programId": "2",
  //     "programName": "restAssured",
  //     "programDescription": "string",
  //     "programStatus": "active"
  //   }
  // ]


  constructor(
    private batchService: BatchService,
    private programService: ProgramService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 




  }

  ngOnInit() {


this.programService.getPrograms().subscribe(list=>{
  this.programList = list;
})

    this.batchService.getBatchList().subscribe(res => {
      this.batchList = res;

      this.programSize = this.batchList.length;
    })
    //  this.getProgramList();
  }




  openNew() {
    this.batch = {};
    this.submitted = false;
    this.batchDialogue = true;
  }

  deleteSelectedBatches() {
    this.confirmationService.confirm({

      message: 'Are you sure you want to delete the selected batches?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchList = this.batchList.filter(
          (val) => !this.selectedBatches.includes(val)
        );
        this.selectedBatches = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Batches Deleted',
          life: 3000,
        });
      },
    });
  }

  editBatch(batch: Batch) {
    this.batch = { ...batch };
    this.batchDialogue = true;
  }


  deleteBatch(batch: Batch) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + batch.batchName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchList = this.batchList.filter((val) => val.batchId!== batch.batchId);
        
        this.batchService.deleteBatch(batch).subscribe(response => {
          console.log('a program is deleted');
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'batch Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.batchDialogue = false;
    this.submitted = false;
  }

  saveBatch(): void {

 
    this.submitted = true;

    if (this.batch.batchName.trim()) {
      if (this.batch.batchId) {
        this.batchList[this.findIndexById(this.batch.batchId )] = this.batch;

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'batch Updated',
          life: 3000,
        });

        this.batchService.updateBatch(this.batch).subscribe((res) => {
          console.log('a program is updated')
        });

      } else {

    
      
        this.programSize = this.programSize + 1;
      //  this.batch.batchId = this.programSize.toString();
        this.batchList.push(this.batch);
        
        const pro  = this.batch.programId;
        this.batch.programId=pro.programId;
        this.batch.programName = pro.programName;

        this.batchService.addBatch(this.batch).subscribe((res) => {
        });


        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Program Created',
          life: 3000,
        });
      }

      this.batchList = [...this.batchList];
      this.batchDialogue = false;
      this.batch = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.batchList.length; i++) {
      if (this.batchList[i].batchId=== id) {
        index = i;
        break;
      }
    }
    return index;
  }

  private getMaxProgramId(max: number) {
    this.batchList.forEach((character) => {
      const tempProgramId = Number(character.batchId);

      if (tempProgramId > max) {
        max = tempProgramId;
      }
    });
    return max;
  }

  private getProgramList() {
    this.visibility = true;
    //  this.programService.getPrograms().subscribe((res) => {
    //   this.programs = res;
    //   this.programSize = this.getMaxProgramId(0);
    //   this.visibility = false;
    // });
  }
}

