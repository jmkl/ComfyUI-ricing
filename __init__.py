import folder_paths
import os
import hashlib

comfy_path = os.path.dirname(folder_paths.__file__)
js_path = os.path.join(comfy_path, "web")

def sha256sum(filename):
    with open(filename, 'rb', buffering=0) as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()
def need_update():
	return sha256sum('user.css')!=sha256sum(os.path.join(js_path,'user.css'))



cur_css = ""
if need_update():
	print('updating user.css')
	with open(os.path.join(os.path.dirname(__file__), "user.css")) as file:
	    cur_css = file.read()
	with open(os.path.join(js_path, "user.css"), "w") as f:
	    f.write(cur_css)






WEB_DIRECTORY = "./web"
