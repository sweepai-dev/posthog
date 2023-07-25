# Generated by Django 3.2.19 on 2023-07-25 21:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import posthog.models.utils


class Migration(migrations.Migration):

    dependencies = [
        ("posthog", "0337_more_session_recording_fields"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserSceneDashboardChoice",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=posthog.models.utils.UUIDT, editable=False, primary_key=True, serialize=False
                    ),
                ),
                ("scene", models.CharField(max_length=200)),
                (
                    "dashboard",
                    models.ForeignKey(
                        blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="posthog.dashboard"
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="posthog.team"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="scene_dashboard_choices",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name="userscenedashboardchoice",
            constraint=models.UniqueConstraint(fields=("team", "user", "scene"), name="posthog_unique_scene_choices"),
        ),
    ]
