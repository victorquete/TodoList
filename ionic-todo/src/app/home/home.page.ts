import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  value = ''

  items:any = []

  // constructor() {}
  constructor(public alertController: AlertController) {}

  async newTask() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nova tarefa',
      inputs: [{
        name: 'TaskName',
        type: 'text',
        placeholder: 'Insira uma tarefa'
      }],
      buttons: [ {
          text: 'Inserir',
          role: 'inserir',
          handler: (data) => {
            this.value = data.TaskName;
            this.addItem();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    if (localStorage.getItem('items')) {
      this.items = JSON.parse(localStorage.getItem('items')??'')
    }
  }

  addItem() {
    let obj = {
      value: this.value,
      isDone: false
    }
    this.items.unshift(obj)
    localStorage.setItem('item', JSON.stringify(this.items))
    this.value = ''
  }

  deleteItem(ind: any) {
    this.items = this.items.filter((c: any, index: any) => index != ind)
    localStorage.setItem('items', JSON.stringify(this.items))
  }

  setDone(index: any) {
    let item = this.items.find((c: any, ind: any) => ind == index)
    item.isDone = !item.isDone
    localStorage.setItem('items', JSON.stringify(this.items))
  }


}
