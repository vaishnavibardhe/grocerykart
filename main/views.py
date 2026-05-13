import json 
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
import os

# Create your views here.


def index(request):
    path = os.path.join(settings.BASE_DIR, 'main/static/assets/js/product.json')

    with open(path, 'r') as file:
        products = json.load(file)
    
    # Filter products by section
    deal_products = [p for p in products if p.get('section') == 'deal']
    new_products = [p for p in products if p.get('section') == 'new']

    return render(request, 'pages/index.html', {
        'products': products,
        'deal_products': deal_products,
        'new_products': new_products
    })


def product(request, id):
    path = os.path.join(settings.BASE_DIR, 'main/static/assets/js/product.json')

    with open(path, 'r') as file:
        products = json.load(file)

    product = next((item for item in products if item["id"] == id), None)

    return render(request, 'pages/product.html', {'product': product})


def about(request):
    return render(request, 'pages/about_us.html')

# ✅ SIRF YE CONTACT FUNCTION REPLACE KARO
def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')

        send_mail(
            subject=f'New Contact Form Message from {name}',
            message=f'Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['vaishnaviab2004@gmail.com'],
            fail_silently=False,
        )

        return redirect('/contact/?success=true')

    return render(request, 'pages/contact.html')

def blog(request):
    return render(request, 'pages/blog.html')

def gallery(request):
    return render(request, 'pages/gallery.html')

def product(request):
    return render(request, 'pages/product.html')

def login(request):
    return render(request, 'pages/login.html')

def product_view(request, id):
    return render(request, 'pages/product.html')

def admin_page(request):
    return render(request, 'admin.html')


def admin_login(request):
    if request.method == "POST":
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')

        # Simple hardcoded authentication for admin
        if username == 'admin' and password == '1234':
            # Create a session for admin (without authentication)
            request.session['admin_user'] = username
            return redirect('dashboard')
        else:
            return render(request, 'pages/index.html', {'error': 'Invalid username or password'})

def dashboard(request):
    # Check if user is logged in
    if 'admin_user' not in request.session:
        return redirect('/')
    
    path = os.path.join(settings.BASE_DIR, 'main/static/assets/js/product.json')
    
    with open(path, 'r') as file:
        products = json.load(file)
    
    return render(request, 'pages/admin_dashboard.html', {'products': products})

def logout(request):
    if 'admin_user' in request.session:
        del request.session['admin_user']
    return redirect('/')


def add_product(request):
    path = os.path.join(settings.BASE_DIR, 'main/static/assets/js/product.json')
    
    if request.method == "POST":
        with open(path, 'r') as file:
            products = json.load(file)
        
        # Find the next available ID
        max_id = max([p['id'] for p in products], default=-1)
        new_id = max_id + 1
        
        # Handle image upload
        img_filename = ''
        if 'img' in request.FILES:
            uploaded_file = request.FILES['img']
            # Save file to static/assets/images/
            image_dir = os.path.join(settings.BASE_DIR, 'main/static/assets/images')
            os.makedirs(image_dir, exist_ok=True)
            file_path = os.path.join(image_dir, uploaded_file.name)
            
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
            
            img_filename = uploaded_file.name
        
        # Create new product
        new_product = {
            'id': new_id,
            'img': img_filename,
            'name': request.POST.get('name', ''),
            'price': request.POST.get('price', ''),
            'desc': request.POST.get('desc', ''),
        }
        
        # Add section if provided
        section = request.POST.get('section', '')
        if section:
            new_product['section'] = section
        
        # Add to products list
        products.append(new_product)
        
        # Save back to JSON
        with open(path, 'w') as file:
            json.dump(products, file, indent=2)
        
        return redirect('dashboard')
    
    return redirect('dashboard')


def edit_product(request, id):
    path = os.path.join(settings.BASE_DIR, 'main/static/assets/js/product.json')
    
    if request.method == "POST":
        with open(path, 'r') as file:
            products = json.load(file)
        
        # Find and update product
        for product in products:
            if product['id'] == id:
                product['name'] = request.POST.get('name', product['name'])
                product['price'] = request.POST.get('price', product['price'])
                product['desc'] = request.POST.get('desc', product['desc'])
                
                # Handle image upload if provided
                if 'img' in request.FILES and request.FILES['img']:
                    uploaded_file = request.FILES['img']
                    # Save file to static/assets/images/
                    image_dir = os.path.join(settings.BASE_DIR, 'main/static/assets/images')
                    os.makedirs(image_dir, exist_ok=True)
                    file_path = os.path.join(image_dir, uploaded_file.name)
                    
                    with open(file_path, 'wb+') as destination:
                        for chunk in uploaded_file.chunks():
                            destination.write(chunk)
                    
                    product['img'] = uploaded_file.name
                
                break
        
        # Save back to JSON
        with open(path, 'w') as file:
            json.dump(products, file, indent=2)
        
        return redirect('dashboard')
    
    return redirect('dashboard')


def delete_product(request, id):
    path = os.path.join(settings.BASE_DIR, 'main/static/assets/js/product.json')
    
    if request.method == "POST":
        with open(path, 'r') as file:
            products = json.load(file)
        
        # Remove product with matching id
        products = [product for product in products if product['id'] != id]
        
        # Save back to JSON
        with open(path, 'w') as file:
            json.dump(products, file, indent=2)
        
        return redirect('dashboard')
    
    return redirect('dashboard')