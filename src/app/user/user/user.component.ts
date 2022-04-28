import { Component, OnInit } from '@angular/core';
import{User}from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];
  user:User;
  visibility: boolean = false;
  userSize: number;
  selectedUsers: User[];
  constructor(private userService: UserService) { }
 
  ngOnInit(): void { 
    this.getUserList();
  console.log(this.selectedUsers);
  }
  private selectRow(checkValue: any) {
    console.log(checkValue);
  }
  private getUserList() {
    this.visibility = true;
    this.userService.getUsers().subscribe((res)=> {
      console.log(res.userDetails);
      this.users=res.userDetails;
      this.visibility = false;
    });
    
  }
 
}

 

