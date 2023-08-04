import { Component, Input } from '@angular/core';

interface TreeNode {
  [key: string]: TreeNode | string;
}

@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
})
export class TreeItemComponent {
  @Input() node: any;


  ngOnInit(): void {
  }

  

  isObject(item: any): boolean {
    return typeof item === 'object' && item !== null;
  }

  getNodeChildren(node: any): { key: string; value: any }[] {
    if (!this.isObject(node)) {
      return [];
    }

    return Object.keys(node)
      .filter((key) => key !== 'expanded')
      .map((key) => ({ key, value: node[key] }));
  }

  toggleNode(keyValuePair: { key: string; value: any }): void {
    console.log("toogleNode");
    
    const value = keyValuePair.value;

    if (this.isObject(value)) {
      value.expanded = !value.expanded;
    }
  }

//   isSelected(value: any): boolean {
//   return this.selectedNodes.includes(value);
// }

  toggleCheckbox( value: any ){
    // if(!(typeof value === 'number')) return
    // if (this.selectedNodes.includes(value)) {
    //   this.selectedNodes = this.selectedNodes.filter(node => node !== value);
    // } else {
    //   this.selectedNodes.push(value);
    // }
    // console.log(this.selectedNodes);
  }

  //   onCheckboxChange(event: any) {
  //   if (event.target.checked) {
  //     console.log('Checkbox is checked');
  //   } else {
  //     console.log('Checkbox is unchecked');
  //   }
  // }
}
