from django.db import models
from django.contrib.postgres.fields import JSONField
from posthog.models.user import User

class SavedFilters(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    filters = JSONField()
    name = models.CharField(max_length=200)