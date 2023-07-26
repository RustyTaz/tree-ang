import { Component, Input } from '@angular/core';

interface TreeNode {
  [key: string]: TreeNode | string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})

// Тут я отображаю рекурсивно полученное дерево + логика открытия закрытия узлов списка
export class TreeComponent {
  @Input() dataTree: any;

  tree: TreeNode | undefined;
  fields = ['enterpriseName', 'vehicleTypeName', 'modelName', 'name'];
  public expandedNodes: string[] = [];

  ngOnInit(): void {
    this.tree = this.buildTree(
      this.dataTree,
      this.fields
    );
    console.log(this.tree);
  }

  get treeKeys(): string[] {
    return this.tree ? Object.keys(this.tree) : [];
  }

  toggleNode(node: string): void {
    if (this.nodeIsExpanded(node)) {
      this.expandedNodes = this.expandedNodes.filter((n) => n !== node);
    } else {
      this.expandedNodes.push(node);
    }
  }

  nodeIsExpanded(node: string): boolean {
    return this.expandedNodes.includes(node);
  }

  isTreeNode(obj: any): obj is TreeNode {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  }

  //метод построения дерева разной глубины в зависимости от входных параметров
  buildTree(data: any[], fields: string[]): TreeNode {
    const tree: TreeNode = {};

    data.forEach((item) => {
      let currentNode = tree;

      fields.forEach((field, index) => {
        const value = item[field];

        if (!currentNode[value]) {
          currentNode[value] = index === fields.length - 1 ? value : {};
        }

        currentNode = currentNode[value] as TreeNode;
      });
    });

    return tree;
  }
}
