from django.db import models
class Singer(models.Model):
    name = models.CharField(max_length=20)
    brithday = models.DateField(null=True,blank=True)
    
    def __str__(self):
        return self.name

class Song(models.Model):
    title = models.CharField(max_length = 200)
    artist = models.ForeignKey(
        Singer,
        on_delete=models.SET_NULL,
        null=True
    )
    duration = models.DurationField(null=True,blank=True)
    file_path = models.FileField(upload_to='songs/')
    updated = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-updated']
    def __str__(self):
        return self.title