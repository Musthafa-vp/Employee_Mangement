from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt



from django.core.files.storage import default_storage

from .models import Department,Employee
from .serializer import DepartmentSerializer,EmployeeSerializer

# Create your views here.
@api_view(['GET','POST','PUT','DELETE'])
def departmentApi(request,pk=0):
    if request.method == 'GET':
        department = Department.objects.all()
        serializer = DepartmentSerializer(department,many = True)
        return Response(data=serializer.data)
    elif request.method == 'POST':
        data=request.data
        serializer=DepartmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response('Added successfull')
        return Response("somethingwrong")
    elif request.method == 'PUT':
        data=request.data
        department = Department.objects.get(id=data['id'])
        serializer = DepartmentSerializer(department,data=data)
        if  serializer.is_valid():
            serializer.save()
            return Response("updated successfully")
        return Response("somethingwrong")
    else:
        department = Department.objects.get(id=pk)
        department.delete()
        return Response("deleted successfully")
    
@api_view(['GET','POST','PUT','DELETE'])
def employeeApi(request,pk=0):
    if request.method == 'GET':
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(employee,many = True)
        return Response(data=serializer.data)
    elif request.method == 'POST':
        data=request.data
        serializer=EmployeeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response('Added successfully')
        print(serializer.errors)
        return Response("somethingwrong")
    elif request.method == 'PUT':
        data=request.data
        department = Employee.objects.get(id=data['id'])
        serializer = EmployeeSerializer(department,data=data)
        if  serializer.is_valid():
            serializer.save()
            return Response('updated successfully')
        print(serializer.errors)
        return Response("somethingwrong")
    else:
        employee = Employee.objects.get(id=pk)
        employee.delete()
        return Response("deleted successfully")  

@csrf_exempt
def SaveFile(request):
    file=request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)      


