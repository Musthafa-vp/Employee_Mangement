from django.db import models

# Create your models here.

class Department(models.Model):
    DepartmentName=models.CharField(max_length=100)

class Employee(models.Model):
    EmployeeName =models.CharField(max_length=100)
    Department = models.CharField(max_length=100)
    DateOfJoin = models.DateField()
    PhotoFileName = models.CharField(max_length=100)   
