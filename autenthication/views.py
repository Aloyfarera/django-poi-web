from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login
from django.contrib import messages


class LoginView(View):
    def get(self, request):
        return render(request, 'authentication/login.html')

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']  # Ensure this matches your HTML form's input name for password
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return redirect('home')  # Replace 'dashboard' with the name of your target page
        else:
            # Return an 'invalid login' error message.
            messages.error(request, 'Invalid username or password.')
            return redirect('login')  # Redirect back to the login page
        