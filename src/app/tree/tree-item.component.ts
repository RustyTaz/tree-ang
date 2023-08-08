import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from './tree.component';

@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
})
export class TreeItemComponent {
  @Input() node?: TreeNode[];
  @Output() valueEmitted = new EventEmitter<TreeNode>();

  //selectedNodes: number[] = [];

  toggleNode(keyValuePair: TreeNode): void {
    keyValuePair.expanded = !keyValuePair.expanded;
  }

  toggleCheckbox(value: TreeNode) {
    console.log(value); 
    this.valueEmitted.emit(value);   
    //console.log("Был имит?");      
    //this.getChildrenNodes(value, value.checked);
    //console.log(this.selectedNodes);
  }

}
