# Generated by Django 5.0.3 on 2024-03-16 07:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_rename_departments_employee_department'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='ProfileFileName',
            new_name='PhotoFileName',
        ),
    ]
