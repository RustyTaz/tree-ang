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

  // nodeKeys(node: TreeNode | string): string[] {
  //   return typeof node === 'object' ? Object.keys(node) : [];
  // }

 isObject(item: any): boolean {
    return typeof item === 'object' && item !== null;
  }

  // Method to get the children of a node (key-value pairs) without "expanded" property
  getNodeChildren(node: any): { key: string; value: any }[] {
    if (!this.isObject(node)) {
      return [];
    }

    return Object.keys(node)
      .filter((key) => key !== 'expanded') // Exclude "expanded" property from the children
      .map((key) => ({ key, value: node[key] }));
  }

  // Method to toggle the node expansion/collapse
  toggleNode(keyValuePair: { key: string; value: any }): void {
    const value = keyValuePair.value;

    if (this.isObject(value)) {
      value.expanded = !value.expanded;
    }
  }
}

