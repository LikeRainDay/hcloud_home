import {Component, OnInit} from '@angular/core';
import {NodeEvent, TreeModel} from "ng2-tree";

const nginx_proxy_url = "http://47.95.207.79:41900";

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

    markdownUrl = nginx_proxy_url + "/valor-software/ng2-tree/master/README.md";

    preBuyDoc: TreeModel = {
        value: "购前须知",
        id: "/valor-software/ng2-tree/master/README.md",
        children: [
            {
                id: "/valor-software/ng2-tree/master/README.md",
                value: "关于HCloud"
            }
        ]
    };

    openVersionDoc: TreeModel = {
        value: "开源版",
        id: "/valor-software/ng2-tree/master/README.md",
        children: [
            {
                id: "/valor-software/ng2-tree/master/README.md",
                value: "关于HCloud"
            }
        ]
    };

    priceVersionDoc: TreeModel = {
        id: "/houshuai0816/hcloud/dev_hcloud/document/DOC-1-DeployProject.md?token=AEOPFLFJOT5CALCENWZYYVC4WMVKM",
        value: "付费版",
        children: [
            {
                id: "/houshuai0816/hcloud/dev_hcloud/document/DOC-1-DeployProject.md?token=AEOPFLFJOT5CALCENWZYYVC4WMVKM",
                value: "关于HCloud"
            }
        ]
    };

    constructor() {
    }

    ngOnInit() {
    }

    handleSelected(e: NodeEvent) {
        this.markdownUrl = nginx_proxy_url + e.node.id;
    }
}
