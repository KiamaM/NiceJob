import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { users } from '../../Interfaces/users.interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-clients',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.css'
})
export class ViewClientsComponent {
  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  id!:string

  userId!:string

  clients:users[] = []


  constructor(private api:ApiService){
    this.getClients()
  }

  getClients(){
    this.api.getClients().subscribe(res=>{
      console.log(res);      
      console.log(this.clients);
      
      console.log(res.clients[0].phoneNumber);
      

      this.clients = res.clients
      console.log(this.clients);

    })
  }

  deleteClient(userId:string){
    this.api.deleteClient(userId).subscribe(res=>{
      if(res.error){
        this.visible = true
        this.errorMsg = res.error
  
        setTimeout(() => {
          this.visible = false
        }, 3000);
      }else if(res.message){
        this.visible2 = true
        this.successMsg = res.message

        
  
        setTimeout(() => {
          this.visible2 = false
        }, 3000);

      this.getClients()
      }
    })

  }

  

}
