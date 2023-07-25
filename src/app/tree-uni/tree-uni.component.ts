import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { TreeService } from '../tree.service';

@Component({
  selector: 'app-tree-uni',
  templateUrl: './tree-uni.component.html',
  styleUrls: ['./tree-uni.component.css'],
})
export class TreeUniComponent implements OnInit  {
  jsonData: any;
  tree: any; 

  constructor(
    private dataService: DataService,
    private treeService: TreeService
  ) {}

  ngOnInit(): void {
    this.jsonData = this.dataService.getData();
    const fields = ["enterpriseName","vehicleTypeName","modelName", "name"];

    this.tree = this.treeService.buildTree(
      this.jsonData.data.controls.VehiclesControl.objects,
      fields
    );
    console.log(this.tree);
  }
}
