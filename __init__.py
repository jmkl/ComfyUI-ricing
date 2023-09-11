import folder_paths
import os
import hashlib

comfy_path = os.path.dirname(folder_paths.__file__)
js_path = os.path.join(comfy_path, "web")


def hash_file(filename: str, blocksize: int = 4096) -> str:
    hsh = hashlib.md5()
    with open(filename, "rb") as f:
        while True:
            buf = f.read(blocksize)
            if not buf:
                break
            hsh.update(buf)
    return hsh.hexdigest()


def need_update():
    return hash_file(os.path.join(os.path.dirname(__file__), "user.css")) != hash_file(
        os.path.join(js_path, "user.css")
    )


cur_css = ""
if need_update():
    print("updating user.css")
    with open(os.path.join(os.path.dirname(__file__), "user.css")) as file:
        cur_css = file.read()
    with open(os.path.join(js_path, "user.css"), "w") as f:
        f.write(cur_css)


WEB_DIRECTORY = "./web"
NODE_CLASS_MAPPINGS = {}
