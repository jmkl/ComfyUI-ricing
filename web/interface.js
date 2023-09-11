import { app } from "../../../scripts/app.js";
let is_hide = false;

function reroute_me(node) {
    node.size = [10, 10]
    console.log(node);
}

const ext = {
    name: "julnodes.interface",
    init(app) {

        const handle = document.querySelector(".drag-handle");
        const thebutton = document.querySelector(".comfy-queue-btn").nextSibling;
        const ui = document.querySelector(".comfy-menu");
        handle.addEventListener("dblclick", (e) => {
            ui.style.height = is_hide ? "auto" : "90px";
            thebutton.style.marginTop = is_hide ? "5px" : "20px";
            is_hide = !is_hide;
        });

        const showLinkMenu = LGraphCanvas.prototype.showLinkMenu;
        LGraphCanvas.prototype.showLinkMenu = function (link, e) {
            var that = app;
            var node_left = that.graph.getNodeById(link.origin_id);
            var node_right = that.graph.getNodeById(link.target_id);


            if (e.altKey) {
                var node = LiteGraph.createNode("Reroute");
                that.graph.add(node, true, { doProcess: false });
                node_left.connect(link.origin_slot, node, 0)
                node_right.disconnectInput(link.target_slot)
                node.connect(0, node_right, link.target_slot);
                node.pos = [e.canvasX, e.canvasY];

                node.pos[0] -= node.size[0] * 0.5;
                return
            } else {
                showLinkMenu.apply(app, arguments);
            }

        }
        const collapse = LGraphNode.prototype.collapse;
        LGraphNode.prototype.collapse = function () {
            console.log("asd");
            collapse.apply(this, arguments);
        }

    },
    setup(app) {

        const menu = document.querySelector(".comfy-menu");
        const managerButton = document.createElement("button");
        managerButton.textContent = "Copy API to Clipboard";
        managerButton.onclick = () => {
            app.graphToPrompt().then(p => {
                const json = JSON.stringify(p.output, null, 2);
                navigator.clipboard.writeText(json);
            })

        }

        menu.append(managerButton);
    },
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name == "Reroute") {
            console.log("Hello");
        }
    }

};
app.registerExtension(ext);