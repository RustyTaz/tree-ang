import { Component, OnInit  } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  jsonData: any;
  selectedField: string | null = null; 
  treeData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.jsonData = this.dataService.getData();
  }

  onSelectField(event: any): void {
    this.selectedField = event.target.value; 
    this.generateTree();
  }

  generateTree(): void {
    if (!this.selectedField || !this.jsonData) return;

    const uniqueValues = new Set<string>();
    this.jsonData.data.controls.VehiclesControl.objects.forEach((item: any) => {
      const value = item[this.selectedField!]; 
      if (value) {
        uniqueValues.add(value);
      }
    });

    this.treeData = Array.from(uniqueValues).map((value) => {
      return {
        name: value,
        children: this.jsonData.data.controls.VehiclesControl.objects.filter(
          (item: any) => item[this.selectedField!] === value 
        ),
      };
    });
  }

}
