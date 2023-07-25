import { Component, Input } from '@angular/core';

interface TreeNode {
  [key: string]: TreeNode | string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})

// Тут я отображаю рекурсивно полученное дерево + логика открытия закрытия узлов списка 
export class TreeComponent {
  @Input() tree: TreeNode | undefined;
  public expandedNodes: string[] = [];

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

}
