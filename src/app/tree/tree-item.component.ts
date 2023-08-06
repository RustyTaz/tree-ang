import { Component, Input } from '@angular/core';
import { TreeNode } from './tree.component';

@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
})
export class TreeItemComponent {
  @Input() node?: TreeNode[];
  selectedNodes: number[]=[];

  toggleNode(keyValuePair: TreeNode): void {
    keyValuePair.expanded = !keyValuePair.expanded;
  }

  toggleCheckbox(value: TreeNode) {
     console.log(value);
    if(!(typeof value.id === 'number')) return
    if (this.selectedNodes.includes(value.id)) {
      this.selectedNodes = this.selectedNodes.filter(node => node !== value.id);
    } else {
      this.selectedNodes.push(value.id);
    }
    console.log(this.selectedNodes);
  }
}
