import sys
# def genImage(fb_id):
import urllib
import PIL
from PIL import Image

fb_id = sys.argv[1]

fn = 'public/images/' + fb_id
crop_fn = 'public/images/cropped_' + fb_id

im = Image.open(fn)
(w, h) = im.size
(x0, y0) = (w/2, h/2)
h2 = min(x0, y0)
im.crop((x0 - h2, y0 - h2, x0 + h2, y0+ h2)).resize((500,500)).save(crop_fn)
