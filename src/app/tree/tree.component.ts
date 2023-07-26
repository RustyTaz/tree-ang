import { Component, Input } from '@angular/core';

interface TreeNode {
  [key: string]: TreeNode | string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  @Input() dataTree: any;

  tree: TreeNode | undefined;
  fields = ['enterpriseName', 'vehicleTypeName', 'modelName', 'name'];

  ngOnInit(): void {
    this.tree = this.buildTree(this.dataTree, this.fields);
    console.log(this.tree);
  }

  buildTree(data: any[], fields: string[]): TreeNode {
    const tree: TreeNode = {};

    data.forEach((item) => {
      let currentNode = tree;

      fields.forEach((field, index) => {
        const value = item[field];

        if (!currentNode[value]) {
          currentNode[value] = index === fields.length - 1 ? item.id : {};
        }

        currentNode = currentNode[value] as TreeNode;
      });
    });

    return tree;
  }

  nodeKeys(node: TreeNode | string): string[] {
    return typeof node === 'object' ? Object.keys(node) : [];
  }
}

