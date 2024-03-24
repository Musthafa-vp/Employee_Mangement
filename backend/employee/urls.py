from django.urls import path
from .views import departmentApi,employeeApi,SaveFile

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('department/',departmentApi),
    path('department/<int:pk>',departmentApi),

    path('employee/',employeeApi),
    path('employee/<int:pk>/',employeeApi),

    path('savefile/',SaveFile)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
