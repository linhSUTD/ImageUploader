import sys
# def genImage(fb_id):
import urllib
import PIL
from PIL import Image
import datetime

# print 'Tep'

fb_id = sys.argv[1]
# print type(fb_id)
fore_filename = 'public/images/' + fb_id + '_in.jpg' 
back_filename = 'public/images/' + 'bg2.jpg'
print fore_filename
print back_filename
img_url = "http://graph.facebook.com/" + fb_id + "/picture?width = 400&height=400"
urllib.urlretrieve(img_url, fore_filename)

fore_im = Image.open(fore_filename)
back_im = Image.open(back_filename)
fore_im = fore_im.resize((500, 500))
back_im = back_im.resize((500, 500))

im_res = Image.blend(fore_im,back_im,0.4)

out_filename = 'public/images/' + fb_id + '_out.jpg'

im_res.save(out_filename)
print out_filename  

	
# fb_id = "1084755001548584"


# genImage(fb_id)
# def resize(img, basewidth):
# 	wpercent = (basewidth/float(img.size[0]))
# 	hsize = int((float(img.size[1])*float(wpercent)))
# 	img = img.resize((basewidth,hsize), PIL.Image.ANTIALIAS)
# 	return img 

# def mix_imgs(img1, img2):
# 	im1 = img1.load()
# 	im2 = img2.load()
# 	# print im1[1, 1] + im2[1,1]
# 	print array([255,10,100],dtype='uint8') +  array([1,10,160],dtype='uint8')


# fore_im = Image.open("linh.jpg") #Can be many different formats.
# # pix = fore_im.load()
# # print pix[1,1] #Get the RGBA Value of the a pixel of an image
# # fore_im.show()



# back_im = Image.open("bg10.jpg");
# # fore_im = resize(fore_im, 400);
# # back_im = resize(back_im, 400);

# fore_im = fore_im.resize((500, 500))
# back_im = back_im.resize((500, 500))

# # print fore_im.size #Get the width and hight of the image for iterating over
# # # print back_im.size #Get the width and hight of the image for iterating over

# im_res = Image.blend(fore_im,back_im,0.4)


# im_res.show()
# im_res.save('test.jpg')
# import webbrowser
# webbrowser.open('test.jpg')
# back_im.show()


# plt.imshow(fore_im)



